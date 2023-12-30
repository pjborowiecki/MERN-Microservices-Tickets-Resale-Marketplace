import type { Request, Response } from 'express';

export const handleSignup = async (req: Request, res: Response) => {
  try {
    // TODO: Implement
    console.log(req.body);
    console.log(res);
    res.status(200).send('handleSignup');
  } catch (error: unknown) {
    if (error instanceof Error) {
      return res.status(500).json({ error: error.message });
    } else {
      return res.status(500).json({ error: 'An unknown error occurred.' });
    }
  }
};

export const handleSignin = async (req: Request, res: Response) => {
  try {
    // TODO: Implement
    console.log(req.body);
    console.log(res);
    res.status(200).send('handleSignin');
  } catch (error: unknown) {
    if (error instanceof Error) {
      return res.status(500).json({ error: error.message });
    } else {
      return res.status(500).json({ error: 'An unknown error occurred.' });
    }
  }
};

export const handleSignout = async (req: Request, res: Response) => {
  try {
    // TODO: Implement
    console.log(req.body);
    console.log(res);
    res.status(200).send('handleSignout');
  } catch (error: unknown) {
    if (error instanceof Error) {
      return res.status(500).json({ error: error.message });
    } else {
      return res.status(500).json({ error: 'An unknown error occurred.' });
    }
  }
};

export const handleGetCurrentUser = async (req: Request, res: Response) => {
  try {
    // TODO: Implement
    console.log(req.body);
    console.log(res);
    res.status(200).send('getCurrentUser');
  } catch (error: unknown) {
    if (error instanceof Error) {
      return res.status(500).json({ error: error.message });
    } else {
      return res.status(500).json({ error: 'An unknown error occurred.' });
    }
  }
};
