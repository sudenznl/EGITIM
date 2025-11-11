import { Fragment, Component } from "react";
import Users from "./Users";
import classes from "./UserFinder.module.css";
import UsersContext from "../store/users-context";
import ErrorBoundary from "./ErrorBoundary";

class UserFinder extends Component {
  //bununla react'a bu bileşen kullanıcının bağlamına erişebimelidir diyoruz.
  // Ancak static bağlam türü özelliğini sadece 1 kez ayarlayabiliriz.
  // Bu yüzden aynı bileşene bağlanöası gereken iki bağlam varsa bunu bir sayı bileşenine sarmak gibi bir çözüm bulmak gerekecek.
  static contextType = UsersContext;

  constructor() {
    super();
    this.state = {
      filteredUsers: [],
      searchTerm: "",
    };
  }

  componentDidMount() {
    // http isteği gönderme...
    this.setState({ filteredUsers: this.context.users });
  }

  //Eğer destek değişikliklerine göre güncelleme yapıyorsak: yani yeni prop değerlerine sahipsek ve güncellemeler için bileşeni oraya eklemek istiyorsak önceki propları mevcut proplarla karşılaştırırız:prevProp kullanıyoruz.
  //Ancak bizim için önemli olan durum değişikliği, bu bileşenin içindeki durum değişikliği, dolayısıyla önceki durumumuzu, bu durumun belirli  bir dilimini mevcut durumla  ve bu durumun belirli br dilimi ile karşılaştırıyoruz: prevState kullanıyoruz.
  componentDidUpdate(prevProps, prevState) {
    if (prevState.searchTerm !== this.state.searchTerm) {
      this.setState({
        filteredUsers: this.context.users.filter((user) =>
          user.name.includes(this.state.searchTerm)
        ),
      });
    }
  }

  searchChangeHandler(event) {
    this.setState({ searchTerm: event.target.value });
  }

  render() {
    return (
      //<UsersContext.Consumer> </UsersContext.Consumer> -> bu yalnızca jsx'te kullanıldığı için hem işlevsel hem de sınıf tabanlı bileşenlerde çalışır.
      <Fragment>
          <div className={classes.finder}>
            <input
              type="search"
              onChange={this.searchChangeHandler.bind(this)}
            />
          </div>
        <ErrorBoundary>
          <Users users={this.state.filteredUsers} />
        </ErrorBoundary>
      </Fragment>
    );
  }
}

//const UserFinder = () => {
// const [filteredUsers, setFilteredUsers] = useState(DUMMY_USERS);
// const [searchTerm, setSearchTerm] = useState("");

//useEffect(() => {
//  setFilteredUsers(
//      DUMMY_USERS.filter((user) => user.name.includes(searchTerm))
//    );
//  }, [searchTerm]);

//const searchChangeHandler = (event) => {
//  setSearchTerm(event.target.value);
// };

//return (
// <Fragment>
//    <div className={classes.finder}>
//   <input type="search" onChange={searchChangeHandler} />
//   </div>
//  <Users users={filteredUsers} />
//    </Fragment>
//);
//};

export default UserFinder;
