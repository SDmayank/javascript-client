import * as yup from 'yup';
import { PersonIcon } from '@material-ui/icons/Person';
import { EmailIcon } from '@material-ui/icons/Email';
import { VisibilityOffIcon } from '@material-ui/icons/VisibilityOff';

export const PUBLIC_IMAGE_FOLDER = '/images/';
export const DEFAULT_BANNER_IMAGE = 'banners/default.png';

export const banners = ['cloud.jpg', 'dns-server.png', 'full-stack-web-development.jpg', 'js.jpg', 'load-balancer.png'];

const selectOption = [
  {
    label: 'Cricket',
    value: 'cricket',

  },
  {
    label: 'Football',
    value: 'Football',

  },

];
const radioOptionsCricket = [
  {
    label: 'Batsman',
    value: 'batsman',

  },
  {
    label: 'Bowler',
    value: 'bowler',

  },
  {
    label: 'WickeetKeepar',
    value: 'wickeetKeepar',

  },
  {
    label: 'Filder',
    value: 'Ffilder',

  },

];
const radioOptionsFootball = [
  {
    label: 'Striker',
    value: 'striker',

  },
  {
    label: 'GoalKeepar',
    value: 'goalkeepar',

  },

];
const schema = yup.object().shape({
  name: yup.string().required('Please enter your Name').min(3, 'Please enter no less than 3 characters'),
  email: yup.string().required('Please select an emailAddress').matches(/([a-zA-Z0-9_\-.]+)@([a-zA-Z0-9_\-.]+)[.]([a-zA-Z0-9_\-.]+)$/gmi, 'please enter vaild email'),
  password: yup.string().min(8, 'Password must be of 8 characters')
    .required('Password is required'),
  confirmPassword: yup.string()
    .oneOf([yup.ref('password'), null], 'Passwords must match')
    .min(8, 'must be of atleast 8 characters')
    .required('confirm password is required'),
});

const icons = {
  name: PersonIcon,
  email: EmailIcon,
  password: VisibilityOffIcon,
  confirmPassword: VisibilityOffIcon,
};


export const Operators = ['+', '-', '/', '*'];
export {
  radioOptionsFootball, selectOption, radioOptionsCricket, schema, icons,
};
