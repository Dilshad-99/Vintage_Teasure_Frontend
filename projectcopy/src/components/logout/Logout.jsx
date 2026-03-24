import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '../../ToastContext';
import { notifyAuthChange } from '../../utils/authEvents';

function Logout() {
  const navigate = useNavigate();
  const { showToast } = useToast();

  useEffect(() => {
    const keysToRemove = [
      'token', '_id', 'email', 'name',
      'mobile', 'address', 'city',
      'gender', 'role', 'info'
    ];
    keysToRemove.forEach(key => localStorage.removeItem(key));

    notifyAuthChange(); // ✅ useEffect ke andar

    showToast("Logged out successfully. See you soon! 👋", "success");
    navigate('/login');
  }, [navigate, showToast]);

  return null;
}

export default Logout;