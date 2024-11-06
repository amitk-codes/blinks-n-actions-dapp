import { Action } from "@solana/actions";
import { Request, Response } from "express";

export const fetchBlinks = async (_req: Request, res: Response) => {
  try {
    const actionMetadata: Action = {
      type: "action",
      icon: "https://res.cloudinary.com/cryptechdev/image/upload/v1730917540/1_10a5b343-0378-4596-8afd-cc53f7097ab3_uxk64a.webp",
      title: "Coffee or Tea?",
      description: "Which do you prefer to start your day?",
      label: "Vote",
      links: {
        actions: [
          {
            label: "Coffee",
            href: "/choose?option=coffee",
            type: "transaction",
          },
          {
            label: "Tea",
            href: "/choose?option=tea",
            type: "transaction",
          },
        ],
      },
    };

    res.status(200).json(actionMetadata);
  } catch (err: any) {
    res.status(500);
  }
};
