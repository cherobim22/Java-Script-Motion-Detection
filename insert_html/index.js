((e, t) => {
    e.gpop ||
        ((e.gpop = { formId: null, publicAuth: null, btnText: null, titleForm: null, erro: null}),
        (e.gpop.loadData = () =>
            new Promise((t) => {
                fetch(`https://api.innovaweb.com.br/form/${e.gpop.formId}/json`, { method: "GET", headers: { Accept: "application/json", "Content-Type": "application/json", Authorization: e.gpop.publicAuth } })
                    .then(async (n) => {
                        // console.log(n.json());
                        return n.json();
                    })
                    .then(forms => {
                        const formulario = document.getElementById('form-inputs');

                        var aform = e.gpop.newForm(forms, e.gpop.btnText);

                        //insere o formulario na pagina
                        for(let x = 0; x<aform.length; x++){
                         formulario.insertAdjacentHTML("beforeend", aform[x])
                        }

                        //pega o input do telefone
                        var phone_input = document.querySelector("#number");
                      
                        //caso exista um campo telefone insere ddi e mascara
                        e.gpop.inputMaskAndDdi(phone_input);
                        
                        
                    }).catch((e) => {
                        t(!1), console.error(e);
                    });
            })),
        (e.gpop.addListeners = () => {
            const data = document.querySelector("#gdpop").dataset;
            const popup = document.getElementById('popup-promocao');
           
            popup.addEventListener('click', (e) => {
                if(e.target.className == 'fechar'){
                    popup.classList.remove('mostrar');
                    document.cookie = "popup = true";
                }
            });  

            // const cookieP = gpop.getCookie('popup');
            // document.cookie = "popup = false";
            // console.log(cookieP);

            if(data.scroll == "on"){
                document.body.onscroll = () => {
                    if(gpop.getCookie('popup') != "true"){
                        setTimeout(() => {
                            popup.classList.add('mostrar');
                        }, 3000)
                    }
                }
            }

            if(data.leave == "on"){
                document.body.onmouseleave = () => {
                    if(gpop.getCookie('popup') != "true"){
                        setTimeout(() => {
                            popup.classList.add('mostrar');
                            localStorage.pop_up_g = 1;   
                        }, 100)
                    } 
                }
            }

            window.onbeforeunload = function(event) {
                // document.cookie = "popup = false";
                 document.cookie = "popup = ; expires = Thu, 01 Jan 1970 00:00:00 GMT"; 
            }
            
            document.getElementById("formulario").addEventListener('submit', e.gpop.addNewLead);
        }),
        (e.gpop.getCookie = (cname) => {
            var name = cname + "=";
            var decodedCookie = decodeURIComponent(document.cookie);
            var ca = decodedCookie.split(';');

            for(var i = 0; i <ca.length; i++) {
                var c = ca[i];
                while (c.charAt(0) == ' ') {
                c = c.substring(1);
                }
                if (c.indexOf(name) == 0) {
                return c.substring(name.length, c.length);
                }
            }
            
            return "";
        }),
        (e.gpop.openPopup = async () => {
            const d = document.querySelector("#gdpop").dataset;
            const m = document.getElementById('popup-promocao');
            if(d.click == "on"){
                m.classList.add('mostrar');
            }
            // localStorage.pop_up_g = 1; 

        }),
        (e.gpop.inputMaskAndDdi = async (input) => {
            
            const tel_input = (elemento) => {
                return intlTelInput(elemento, {
                    nationalMode: false,
                    initialCountry: "br",
                    separateDialCode: true,
                    preferredCountries: ["br", "us", "gb", "pt"],
               
                });
            }
            
            tel_input(input);

            input.addEventListener('blur', function (e) {
                const ddis = document.querySelector('.iti__selected-dial-code').textContent;
                if(input.value != ''){
                    switch (ddis) {
                        case '+55':
                            var x = e.target.value.replace(/\D/g, '').match(/(\d{2})(\d{5})(\d{4})/);
                            e.target.value = '(' + x[1] + ') ' + x[2] + ' - ' + x[3];
                        break;
                        case "+1":
                            var x = e.target.value.replace(/\D/g, '').match(/(\d{3})(\d{3})(\d{4})/);
                            e.target.value = '('  + x[1] + ') ' + x[2] + ' - ' + x[3];
                        break;
                        case "+351":
                            var x = e.target.value.replace(/\D/g, '').match(/(\d{3})(\d{3})(\d{4})/);
                            e.target.value =  + x[1] + ' - ' + x[2] + ' - ' + x[3];
                        break;
                        case "+44":
                            var x = e.target.value.replace(/\D/g, '').match(/(\d{4})(\d{6})/);
                            e.target.value =   x[1] + ' - ' + x[2];
                        break;
                        case "+54":
                            var x = e.target.value.replace(/\D/g, '').match(/(\d{1})(\d{2})(\d{4})(\d{4})/);
                            e.target.value = x[1] + ' ' +x[2]+ ' '+ x[3] + ' - ' + x[4];
                        break;
                        case "+61":
                            var x = e.target.value.replace(/\D/g, '').match(/(\d{3})(\d{3})(\d{3})/);
                            e.target.value = x[1] + ' ' +x[2]+ ' '+ x[3];
                        break;  
                    }
                }
            });
        }),
        (e.gpop.addNewLead =  () => {
            // x.preventDefault();
            const formulario = document.getElementById('formulario');
            const popup = document.getElementById('popup-promocao');
            const x = document.getElementById("popMsg");

            //console.log('test');
            const valores = {};
            valores['id_form'] = e.gpop.formId;
          
            for(let i=0; i<formulario.elements.length; i++){  
                if(formulario.elements[i].type != 'button' && formulario.elements[i].value != ''){
                    if(formulario.elements[i].name == 'telefone'){
                        const ddi = document.querySelector('.iti__selected-dial-code').textContent;
                        const form_value = formulario.elements[i].value.replace(/\D/g, '');
                        const phone = ddi.concat(form_value);
                        
                        valores[formulario.elements[i].name] = phone;
                        // console.log(phone);
                    }else{
                        valores[formulario.elements[i].name] = formulario.elements[i].value;
                    }
                }
            }

            // const data = JSON.stringify(valores);
            const validation  = gpop.validaForm(valores);

            console.log(validation);

            if(validation === true){

               
               const data = JSON.stringify(valores);
            
                new Promise(() => {
                    fetch("https://api.innovaweb.com.br/lead/", {
                        method: "POST",
                        headers: { Accept: "application/json", "Content-Type": "application/json", Authorization: e.gpop.publicAuth  },
                        body: data,
                    }).then((response)=>{
                        if(response.status != '200'){
                            alert("Houve algum erro inesperado");
                        }else{
                            x.innerHTML =  "Cadastrado com sucesso";
                            x.style.display = "block";
                            x.style.color = "#2ecc92";
                            setTimeout(function(){  x.style.display = "none"; popup.classList.remove('mostrar'); }, 2000);
                        }
                    }).catch((erro)=> {
                        // alert("Houve algum erro inesperado");
                        console.log(erro);
                    })
                }); 

                
            }
          
    
        }),
        (e.gpop.validaForm = (values) => {
            const x = document.getElementById("popMsg");

            if(values['email'] && !values['email'].includes(".")){
                x.innerHTML =  "O campo email esta incompleto " +values['email'];
                x.style.display = "block";
                setTimeout(function(){  x.style.display = "none"; }, 4000);
                // document.body.innerHTML = document.body.innerHTML.replace('{{erro}}', "O campo email esta incompleto " +values['email']);
                return false;
            }
        
            if(values['nome'] && !values['telefone']){
                x.innerHTML =  "o campo de telefone precisa estra preenchido";
                x.style.display = "block";
                setTimeout(function(){  x.style.display = "none"; }, 4000);
                return false;
            }

            return true;
        }),
        (e.gpop.newForm = (forms, button_text) => {
            //função resposavel por verificar e montar a estrutura do fomulario
            //console.log(forms);
            var form_elements = [];
        
            for(let i = 0; i< forms.length; i++){
                if(forms[i].type != 'button' && forms[i].name != 'telefone' && forms[i].name != 'email'){
                    if(forms[i].required == 'true'){
                        form_elements[i] = [
                            `<input class='input-form' type='${forms[i].type}' name='${forms[i].name}' placeholder='${forms[i].placeholder}' required>`
                        ];
                    }else{
                        form_elements[i] = [
                            `<input class='input-form' type='${forms[i].type}' name='${forms[i].name}' placeholder='${forms[i].placeholder != undefined  ? forms[i].placeholder : forms[i].name }' >`
                        ];
                    }
                }else{
                    form_elements[i] = [
                        `<button class='button-form' type='submit'  name='${forms[i].name}' placeholder='${forms[i].placeholder}'>${button_text != "" ? button_text : "{{data-button-text}}"}</button>`
                    ];
                }

                if(forms[i].name == 'telefone'){
                    if(forms[i].required == 'true'){
                        form_elements[i] = [
                        `<input id="number" class='input-form' type='${forms[i].type}' name='${forms[i].name}' required>`
                    ];
                    }else{
                        form_elements[i] = [
                            `<input id="number" class='input-form' type='${forms[i].type}' name='${forms[i].name}'>`
                        ]; 
                    }
                }   
                if(forms[i].name == 'email'){
                    if(forms[i].required == 'true'){
                        form_elements[i] = [
                            `<input class='input-form' type='${forms[i].name}' name='${forms[i].name}' placeholder='${forms[i].placeholder}' required>`
                        ];
                    }else{
                        form_elements[i] = [
                            `<input class='input-form' type='${forms[i].name}' name='${forms[i].name}' placeholder='${forms[i].placeholder != undefined  ? forms[i].placeholder : forms[i].name }' >`
                        ];
                    }
                }

                if(forms[i].type == 'checkbox-group'){
                    var x = forms[i].values;
                    const v = [];
                    // console.log(x[0]);
                    for(let z = 0; z< x.length; z++){
                        v[z] = `<option value="${x[z].value}">${x[z].label}</option>`
                    }
                    // console.log(v);
                    form_elements[i] = [
                            `<select id="selectG"  name='${forms[i].name}' >
                            <option value="">${forms[i].label}</option>
                            ${v}
                            </select>`
                    ];
                }  
            }
   
            // console.log(form_elements);
            return  form_elements;

        }),
        (e.gpop.init = async (t) => {
            e.gpop.publicAuth = document.querySelector("#gdpop").dataset.publicAuth;
            e.gpop.formId = document.querySelector("#gdpop").dataset.formId;
            e.gpop.btnText = document.querySelector("#gdpop").dataset.buttonText;
            e.gpop.titleForm = document.querySelector("#gdpop").dataset.formTitle
         
            await e.gpop.injectBaseHtml(t);
            await e.gpop.addListeners();
            await e.gpop.injectPhoneJs(t), e.gpop.injectPhoneUtils(t);
           
            if (!(await e.gpop.loadData())) throw "Failed to load data";
            if (!(await e.gpop.injectBaseCss(t))) throw "Failed to load css";

        }),
        (e.gpop.showMessages = (t, erro) =>{
                (a = a.replace("{{erro}}",  e.gpop.titleForm != "" ? e.gpop.titleForm : "{{data-form-title}}"  )),
                t.body.insertAdjacentHTML("beforeend", a), n(!0);
        }),
        (e.gpop.injectBaseHtml = (t) =>
            new Promise(async (n) => {
                let a = await e.gpop.loadTemplate();
                // console.log(a);
                if (!a) throw "Error loading template";

                await e.gpop.injectBaseCss(t), e.gpop.injectPhoneCss(t);
                (a = a.replace("{{title}}",  e.gpop.titleForm != "" ? e.gpop.titleForm : "{{data-form-title}}"  )),
                 t.body.insertAdjacentHTML("beforeend", a), n(!0);
        })),
        (e.gpop.loadTemplate = () =>
            new Promise((e) => {
                fetch("index.html", { method: "GET" })
                    .then(async (t) => {
                        let n = await t.text();
                        e(n);
                    })
                    .catch((t) => {
                        e(!1);
                    });
        })),
        (e.gpop.injectBaseCss = (e) =>
            new Promise((t) => {
                fetch("index.css", { method: "GET" })
                    .then(async (n) => {
                        let a = await n.text(),
                            o = e.createElement("style");
                        (o.textContent = a), e.head.append(o), t(!0);
                    })
                    .catch((e) => {
                        console.error(e), t(!1);
                    });
        })),
        (e.gpop.injectPhoneCss = (e) =>
            new Promise((t) => {
                fetch("https://testeallan.gpages.com.br/FormPopUp/build/css/intlTelInput.css", { method: "GET" })
                    .then(async (n) => {
                        let a = await n.text(),
                            o = e.createElement("style");
                        (o.textContent = a), e.head.append(o), t(!0);
                      
                    })
                    .catch((e) => {
                        console.error(e), t(!1);
                    });
        })),
        (e.gpop.injectPhoneJs = (e) =>
            new Promise((t) => {
                fetch("https://testeallan.gpages.com.br/FormPopUp/build/js/intlTelInput.js", { method: "GET" })
                    .then(async (n) => {
                        let a = await n.text(),
                            o = e.createElement("script");
                        (o.textContent = a), e.head.append(o), t(!0);
                    
                    })
                    .catch((e) => {
                        console.error(e), t(!1);
                    });   
        })),
        (e.gpop.injectPhoneUtils = (e) =>
            new Promise((t) => {
                fetch("https://testeallan.gpages.com.br/FormPopUp/build/js/utils.js", { method: "GET" })
                    .then(async (n) => {
                        let a = await n.text(),
                            o = e.createElement("script");
                        (o.textContent = a), e.head.append(o), t(!0);
                    })
                    .catch((e) => {
                        console.error(e), t(!1);
                    });
        })),
        e.gpop.init(t));
})(window, document);
