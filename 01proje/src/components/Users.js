import { Component, useState } from "react";
import User from "./User";
import classes from "./Users.module.css";

const DUMMY_USERS = [
  { id: "u1", name: "Max" },
  { id: "u2", name: "Manuel" },
  { id: "u3", name: "Julie" },
];

//sınıf tabanlı bileşenleri bu şekilde oluştururuz:
class Users extends Component {
  //durum ve sınıf tabanlı bileşenleri tanımlamak için constructor kullanacağız:
  constructor() {
    super();
    this.state = {
      showUsers: true,
      more: "Test",
    };
  }

  componentDidUpdate() {
    //try {
   //  someCodeWhichMightFail();
  //  } catch (err) {
      //handle error
//    } ->  catch yalnızca normal JS deyimlerinde çalışır; hatayı üst bileşende ele almak istediğimizde işe yaramaz.

    if (this.props.users.length === 0) {
      throw new Error("Kullanıcı sağlanamadı!");
    }
  }

  toggleUsersHandler() {
    this.setState((curState) => {
      return { showUsers: !curState.showUsers };
    });
  }
  render() {
    const usersList = (
      <ul>
        {this.props.users.map((user) => (
          <User key={user.id} name={user.name} />
        ))}
      </ul>
    );

    //kullanıcı listelerini koşullu oluşturduk ki gizle dediğimizde kaldırılsın:
    return (
      <div className={classes.users}>
        <button onClick={this.toggleUsersHandler.bind(this)}>
          {this.state.showUsers ? "Hide" : "Show"} Users
        </button>
        {this.state.showUsers && usersList}
      </div>
    );
  }
}

 //const Users = () => {
// const [showUsers, setShowUsers] = useState(true);

  //const toggleUsersHandler = () => {
 // setShowUsers((curState) => !curState);
//};

      //const usersList = (
     // <ul>
    //  {DUMMY_USERS.map((user) => (
   //   <User key={user.id} name={user.name} />
  //))}
 //</ul>
// );

        //return (
       //<div className={classes.users}>
      //<button onClick={this.toggleUsersHandler.bind(this)}>
     //  {this.state.showUsers ? "Hide" : "Show"} Users
    //  </button>
   //    {this.state.showUsers && usersList}
  //    </div>
 //    );

//};

export default Users;
