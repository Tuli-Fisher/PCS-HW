import './Login.css';
import useForm from './useForm';

export default function Login(props) {
  const { setUserName } = props;

  const [formData, setFormData] = useForm({
    userName: '',
    password: ''
  })

  async function login(e) {
    e.preventDefault();

    const response = await fetch('http://localhost:8080/login', {
      method: 'POST',
      body: JSON.stringify(formData),
      headers:{
        'content-type': 'application/json'
      },
      credentials: 'include'
    });

    if(response.ok){
      setUserName(formData.userName);
    }else{
      setUserName('whoops - looks like there was a problem logging in');
    }
    
  }

  return (
    <form id="login" onSubmit={login}>
      <label>name:
        <input name="userName" required value={formData.userName} onChange={setFormData} />
      </label>

      <label>password:
        <input type="password" name="password" required value={formData.password} onChange={setFormData} />
      </label>

      <button>login</button>

      <button type="button">register</button>
    </form>
  )
}
