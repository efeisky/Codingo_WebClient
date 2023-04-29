import React,{useState,useEffect} from 'react'
import axios from 'axios'
import {Link} from 'react-router-dom'

import './searchBar.css'
const SearchBar = () => {

  const [value, setValue] = useState('')
  const [profiles, setProfiles] = useState(null)
  const [findedUsers, setFindedUsers] = useState(null)
  const [activeFindUser, setActiveFindUser] = useState(false)
  const [isUploading, setIsUploading] = useState(true)
  useEffect(() => {
    axios.get('/searchProfile')
      .then((res) => {
        if(!res.data.err) {
          const data = res.data.profile;
          setProfiles([...data])
          setIsUploading(false)
        } else {
          console.log('Bir hata oluştu');
        }
      })
      .catch((err) => console.log(err));
  }, []);
  
  const findProfile = (searchTerm) => {
    const filteredUsers = profiles.filter((user) => {
      const usernameMatch = user.username.toLowerCase().includes(searchTerm.toLowerCase());
      const realNameMatch = user.realName.toLowerCase().includes(searchTerm.toLowerCase());
      return usernameMatch || realNameMatch;
    });
    return filteredUsers
  }
  const handleChange = (e) => {
    e.preventDefault()
    setValue(e.target.value)
    if(e.target.value === ''){
      setFindedUsers(null)
      setActiveFindUser(false)
      return;
    }else{
      const filteredUsers = findProfile(e.target.value)
      setFindedUsers([...filteredUsers])
      if(filteredUsers.length !== 0){
        setActiveFindUser(true)
      }else{
        setActiveFindUser(false)
      }
    }
    
  }
  
  return (
    <div className='searchArea'>
        <input type='text' className='searchInput' value={value} placeholder='Kullanıcı Arayın..' onChange={handleChange}/>
        {activeFindUser ? (
          <div className='findedUserArea'>
            {findedUsers.map((user, index) => (
              <Link to={`/${user.username}/profile`} key={index} className='user'>
              <img src={user.pictureSrc} alt={user.username} />
                <p id='realname'>{user.realName}</p>
                <p id='username'>@{user.username}</p>
              </Link>
            ))}

          </div>
        ) : (
          <>

          </>
        )}
    </div>
  )
}

export default SearchBar