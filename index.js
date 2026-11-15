import "dotenv/config";

const runner = async () => {
  try {
    const res = await fetch("https://spectate-7cg5.onrender.com/api/runner", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${process.env.SECRET_KEY}`,
      },
      signal: AbortSignal.timeout(10 * 60 * 1000),
    });

    if (!res.ok) {
      const body = await res.text();
      throw new Error(
        `Runner API responded with ${res.status} ${res.statusText}: ${body}`,
      );
    }

    const data = await res.json();

    console.log(data);

    process.exit(0);
  } catch (err) {
    if (err.name === "TimeoutError") {
      console.error(
        "Timeout: It took more than 10 minutes for runner to be completed",
      );
    } else {
      console.error(`Error: type: ${err.name}, message: ${err.message}`);
    }
    process.exit(1);
  }
};

runner();
