import React from "react";
import { uniq, map, compose } from "ramda";
import { Link } from "react-router-dom";
import { Table, Heading } from "react-bulma-components";
import { useStore } from "../store";
import { useRequest } from "ahooks";
import { getUserData } from "../api/backend";
import { getTokenProfile } from "../api/token";

export function MyAirdrop() {
  const store = useStore();
  const { id } = store.get("atData");
  async function fetchData() {
    const { events, logs } = await getUserData(id);
    console.log("e", events);
    const tokenIds = compose(
      uniq,
      map((e) => e.token_id)
    )(events);
    const tokens = await Promise.all(
      tokenIds.map(async (id) => {
        const { data } = await getTokenProfile(id);
        return data.token;
      })
    );
    const tokenProfile = {};
    tokens.forEach((token) => {
      tokenProfile[token.id] = token;
    });
    return { events, logs, tokenIds, tokenProfile };
  }
  const { data, loading, error } = useRequest(() => fetchData());
  if (loading) {
    return (
      <div
        className="cashtag has-text-centered panel is-primary"
        style={{ maxWidth: "650px", margin: "10px auto" }}
      >
        <p className="panel-heading">Loading Profiles</p>
      </div>
    );
  } else if (error) {
    return (
      <div
        className="cashtag has-text-centered panel is-primary"
        style={{ maxWidth: "650px", margin: "10px auto" }}
      >
        <p className="panel-heading">Error happened when fetching Profiles</p>
      </div>
    );
  }
  return (
    <div
      className="cashtag has-text-centered panel is-primary"
      style={{ maxWidth: "650px", margin: "10px auto" }}
    >
      <p className="panel-heading">My page</p>
      <Heading>AirDrop Event created by me</Heading>
      <EventsList events={data.events} tokenProfile={data.tokenProfile} />
    </div>
  );
}

function EventsList({ events, tokenProfile }) {
  return (
    <div className="events">
      <Table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Cashtag</th>
            <th>Claimed</th>
            <th>Qty</th>
            <th>Total Amount</th>
            <th>Created At</th>
          </tr>
        </thead>
        <tfoot>
          <tr>
            <th>Title</th>
            <th>Cashtag</th>
            <th>Claimed</th>
            <th>Qty</th>
            <th>Total Amount</th>
            <th>Created At</th>
          </tr>
        </tfoot>
        <tbody>
          {events.map((event) => (
            <Event
              key={event.id}
              event={event}
              token={tokenProfile[event.token_id]}
            />
          ))}
        </tbody>
      </Table>
    </div>
  );
}

function Event({ event, token }) {
  return (
    <tr>
      <td>{event.title}</td>
      <td>
        <Link to={`/claim/${event.cashtag}`} target="_blank">
          ${event.cashtag}
        </Link>
      </td>
      <td>{event.claimed}</td>
      <td>{event.quantity} </td>
      <td>
        {event.amount / 10 ** token.decimals} {token.symbol}
      </td>
      <td>{new Date(event.created_at).toLocaleString()}</td>
    </tr>
  );
}
