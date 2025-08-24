import { useContext, useEffect } from 'react';
import Swal from 'sweetalert2';
import { useNavigate, useLocation } from 'react-router-dom';
import { UserContext } from '../../contexts/userContext.js';

export default function GuestOnlyRoute({ children }) {
  const { userLogin, setUserLogin } = useContext(UserContext);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const guestPaths = ['/login', '/signup']; // الصفحات الممنوع دخول المسجلين فيها
    if (userLogin && guestPaths.includes(location.pathname)) {
      Swal.fire({
        title: 'You are already logged in ✅',
        text: 'If you want to log in with a different account, please logout first.',
        icon: 'info',
        showCancelButton: true,
        confirmButtonText: '🚪 Logout',
        cancelButtonText: '🏠 Stay Here',
        reverseButtons: true,
        customClass: {
          confirmButton: 'bg-orange-600 text-white font-semibold px-5 py-2 rounded-md hover:bg-orange-700 transition-all duration-200 focus:outline-none border-none',
          cancelButton: 'bg-gray-100 text-gray-700 font-medium px-5 py-2 rounded-md hover:bg-gray-200 transition-all duration-200 border border-gray-300',
          actions: 'space-x-4'
        },
        buttonsStyling: false,
      }).then((result) => {
        if (result.isConfirmed) {
          localStorage.removeItem('token');
          setUserLogin(null);
          navigate(location.pathname); // بعد Logout يقدر يرجع يدخل
        } else {
          navigate('/'); // لو ضغط Stay Here يرجع للصفحة الرئيسية
        }
      });
    }
  }, [userLogin, location.pathname]);

  if (userLogin && ['/login', '/signup'].includes(location.pathname)) {
    return null; // يمنع عرض المحتوى للصفحات الخاصة بالضيوف
  }

  return children;
}
