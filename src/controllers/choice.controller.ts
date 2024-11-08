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
    res.status(500).send("SERVER ERROR");
  }
};

export const blinkActions = async (req: Request, res: Response) => {
  try {
    const { option } = req.query;

    if (option !== "tea" && option !== "coffee") {
      res
        .status(400)
        .json({ message: "only 'coffee' or 'tea' is allowed as the option" });

      return;
    }

    const connection = new Connection("http://127.0.0.1:8899", "confirmed");

    const program: Program<ISolanaChoice> = new Program(
      SolanaChoiceIdl as ISolanaChoice,
      { connection }
    );

    const body: ActionPostRequest = req.body;
    let voter;

    try {
      voter = new PublicKey(body.account);
    } catch (_err) {
      res.status(400).json({ message: "INVALID ACCOUNT" });
      return;
    }

    const instruction = await program.methods
      .vote(new BN(1), option)
      .accounts({
        signer: voter,
      })
      .instruction();

    const { lastValidBlockHeight, blockhash } =
      await connection.getLatestBlockhash();

    const tx = new Transaction({
      blockhash,
      lastValidBlockHeight,
      feePayer: voter,
    }).add(instruction);

    const response = await createPostResponse({
      fields: {
        type: "transaction",
        transaction: tx,
      },
    });

    res.status(200).json(response);
  } catch (err: any) {
    res.status(500);
  }
};
