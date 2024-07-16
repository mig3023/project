// export default async function handler(req, res) {
//   const { orderId, paymentKey, amount } = req.query;
//   const secretKey = process.env.TOSS_SECRET_KEY;
//   const url = "https://api.tosspayments.com/v1/payments/confirm";
//   const basicToken = Buffer.from(`${secretKey}:`, "utf-8").toString("base64");
//   await fetch(url, {
//     method: "post",
//     body: JSON.stringify({
//       amount,
//       orderId,
//       paymentKey,
//     }),
//     headers: {
//       Authorization: `Basic ${basicToken}`,
//       "Content-Type": "application/json",
//     },
//   }).then((res) => res.json());
//   //유효성 검사
//   // TODO: DB 처리
//   res.redirect(`/payments/complete?orderId=${orderId}`);
// }
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { orderId, paymentKey, amount } = req.query;
  const secretKey = process.env.TOSS_SECRET_KEY;

  if (
    typeof orderId !== 'string' ||
    typeof paymentKey !== 'string' ||
    typeof amount !== 'string'
  ) {
    res.status(400).json({ error: 'Invalid query parameters' });
    return;
  }

  const url = 'https://api.tosspayments.com/v1/payments/confirm';
  const basicToken = Buffer.from(`${secretKey}:`, 'utf-8').toString('base64');

  try {
    const response = await fetch(url, {
      method: 'post',
      body: JSON.stringify({
        amount,
        orderId,
        paymentKey,
      }),
      headers: {
        Authorization: `Basic ${basicToken}`,
        'Content-Type': 'application/json',
      },
    });

    const result = await response.json();

    if (!response.ok) {
      res.status(response.status).json(result);
      return;
    }

    // TODO: DB 처리

    res.redirect(`/payments/complete?orderId=${orderId}`);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
}
