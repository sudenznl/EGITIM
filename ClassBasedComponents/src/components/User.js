import { Component } from 'react';

import classes from './User.module.css';

class User extends Component{
  componentWillUnmount() {
    console.log('kullanıcı bağlantıyı kesecek')
  }

  //render eklediğimiz için teorik olarak sınıfa istediğimiz kadar yöntem ekleyebiliriz:
  render() {
  return <li className={classes.user}>{this.props.name}</li>;
 }
}

  //const User = (props) => {
 // return <li className={classes.user}>{props.name}</li>;
//};

export default User;
