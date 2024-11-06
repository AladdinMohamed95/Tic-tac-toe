import type { NextApiRequest, NextApiResponse } from "next";
import Pusher from "pusher";

const pusher = new Pusher({
  appId: "1891075",
  key: "ca5900ee003d57010b9b",
  secret: "2724db0bdd21a62e1fe0",
  cluster: "eu",
  useTLS: true,
});

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    const { message, channelName } = req.body;
    // Trigger an event on the specified channel
    pusher.trigger("alaa", "my-event", {
      message,
    });

    return res.status(200).json({ success: true });
  }

  return res.status(405).json({ error: "Method not allowed" });
}
