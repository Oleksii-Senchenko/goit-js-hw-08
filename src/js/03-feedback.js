import throttle from 'lodash.throttle';
//нашел форму
const formEl = document.querySelector('.feedback-form')




// const save = (key, value) => {
//     try {
//       const serializedState = JSON.stringify(value);
//       localStorage.setItem(key, serializedState);
//     } catch (error) {
//       console.error("Set state error: ", error.message);
//     }
//   };

//   const load = key => {
//     try {
//       const serializedState = localStorage.getItem(key);
//       return serializedState === null ? undefined : JSON.parse(serializedState);
//     } catch (error) {
//       console.error("Get state error: ", error.message);
//     }
//   };






const LOCAL_KEY = "feedback-form-state"

let userData = {}


function onInputChange({ target }) {

    const inputValue = target.value
 
    const inputName = target.name

    userData[inputName] = inputValue


    localStorage.setItem(LOCAL_KEY, JSON.stringify(userData))
}





function onRenderPage(){

    const unPars = JSON.parse(localStorage.getItem(LOCAL_KEY))

    if (!unPars) {
        return
    }

    for (const key in unPars) {
        if (unPars.hasOwnProperty(key)) {
                            //   value это textContent
          formEl.elements[key].value = unPars[key];

          if (unPars[key]) {
            
            userData[key] = unPars[key]

          }     
        }
    }
}
function onSubmit(e){
e.preventDefault()

const {elements:{email, message}} = e.currentTarget
if (email.value === '' || message.value === '') {
     
alert('Fill All Fields')

    return

}

localStorage.removeItem(LOCAL_KEY)
e.currentTarget.reset()
console.log(userData);
userData = {}
}





onRenderPage()


formEl.addEventListener('input', throttle(onInputChange, 500))
formEl.addEventListener('submit', onSubmit)