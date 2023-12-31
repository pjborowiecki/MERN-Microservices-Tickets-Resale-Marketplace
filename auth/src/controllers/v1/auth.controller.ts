import type { Request, Response } from 'express';

export const signup = async (req: Request, res: Response) => {
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

export const signin = async (req: Request, res: Response) => {
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

export const signout = async (req: Request, res: Response) => {
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

export const getCurrentUser = async (req: Request, res: Response) => {
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
