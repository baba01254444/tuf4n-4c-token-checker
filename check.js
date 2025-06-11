export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, error: 'Method not allowed' });
  }

  const { token } = req.body;

  if (!token) {
    return res.status(400).json({ success: false, error: 'Token is required' });
  }

  try {
    let response = await fetch(`https://graph.facebook.com/me?fields=name&access_token=${token}`);
    let data = await response.json();

    if (data && !data.error) {
      return res.status(200).json({ success: true, name: data.name });
    }

    response = await fetch(`https://graph.facebook.com/v13.0/me?access_token=${token}`);
    data = await response.json();

    if (data && !data.error) {
      return res.status(200).json({ success: true, name: data.name });
    }

    return res.status(400).json({ success: false, error: 'Invalid Token or Permissions' });

  } catch (err) {
    return res.status(500).json({ success: false, error: 'Server error' });
  }
}