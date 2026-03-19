import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '../../ToastContext';

function Logout() {
  const navigate = useNavigate();
  const { showToast } = useToast();

  useEffect(() => {
    // clear all localStorage
    const keysToRemove = [
      'token', '_id', 'email', 'name',
      'mobile', 'address', 'city',
      'gender', 'role', 'info'
    ];
    keysToRemove.forEach(key => localStorage.removeItem(key));

    showToast("Logged out successfully. See you soon! 👋", "success");
    navigate('/login');
  }, [navigate, showToast]);

  return null;
}

export default Logout;