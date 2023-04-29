import axios from 'axios';
import CryptoJS from 'crypto-js'

export const getUserPages = (plainUsername,lesson = '') => {

  return axios.get("/getUserMainpage", {
    params:{
      username : plainUsername,
      lesson
    }
  }).then((res) => {
    if(res.data.status === 1){
      if(res.data.lessonDatas.lessonSubject === null){
        return {
          hd:{
            photoUrl: res.data.headerDatas.photoUrl,
            userScore: res.data.headerDatas.score,
            eduLevel : res.data.headerDatas.educationLevel,
            username : res.data.headerDatas.username
          },
          ld:{
            mathNumber : res.data.lessonDatas.mathNumber,
            pythonNumber : res.data.lessonDatas.pythonNumber
          }
        };
      }else{
        return {
          hd:{
            photoUrl: res.data.headerDatas.photoUrl,
            userScore: res.data.headerDatas.score,
            eduLevel : res.data.headerDatas.educationLevel,
            username : res.data.headerDatas.username
          },
          ld:{
            mathNumber : res.data.lessonDatas.mathNumber,
            mathSubject : res.data.lessonDatas.mathSubject,
            pythonNumber : res.data.lessonDatas.pythonNumber,
            pythonSubject : res.data.lessonDatas.pythonSubject
          }
        };
      }
      
    } else {
      throw new Error('Bir hata meydana geldi.');
    }
  }).catch((err) => {
    throw new Error(err);
  });
};
export const decrypt = (cipherText,key) => {
    const bytes = CryptoJS.AES.decrypt(cipherText, key);
    return bytes.toString(CryptoJS.enc.Utf8);
}