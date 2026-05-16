function Error({ statusCode }: { statusCode: number }) {
  return (
    <div style={{ padding: 48, fontFamily: "Inter, system-ui, sans-serif", textAlign: "center" }}>
      <h1 style={{ fontSize: 28, marginBottom: 8 }}>{statusCode || "Error"}</h1>
      <p style={{ color: "#6b7280" }}>
        {statusCode ? `A ${statusCode} error occurred on the server.` : "An error occurred on the client."}
      </p>
    </div>
  );
}

Error.getInitialProps = ({ res, err }: { res?: { statusCode: number }; err?: { statusCode: number } }) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404;
  return { statusCode };
};

export default Error;
