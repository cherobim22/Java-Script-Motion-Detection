((e, t) => {
    e._wf ||
    ((e._wf = { formId: '', publicAuth: ''}),
        (e._wf.loadData = () =>
            new Promise((t) => {
                fetch(`https://api.innovaweb.com.br/form/${e._wf.formId}/json`, { method: "GET", headers: { Accept: "application/json", "Content-Type": "application/json", Authorization: e._wf.publicAuth } })
                    .then(async (n) => {
                        return n.json();
                    })
                    .then(forms => {
                        const formulario = document.getElementById('form-inputs');
                        var aform = e._wf.newForm(forms);
                        
                        //insere o formulario na pagina
                        for(let x = 0; x<aform.length; x++){
                         formulario.insertAdjacentHTML("beforeend", aform[x])
                        }

                        //pega o input do telefone
                        var input = document.querySelector("#number");
                      
                        //caso exista um campo telefone insere ddi e mascara
                        if(input){
                            const tel_input = (elemento) => {
                                return intlTelInput(elemento, {
                                    nationalMode: false,
                                    initialCountry: "br",
                                    // geoIpLookup: function(success, failure) {
                                    // $.get("https://ipinfo.io", function() {}, "jsonp").always(function(resp) {
                                    //     var countryCode = (resp && resp.country) ? resp.country : "";
                                    //     success(countryCode);
                                    // });
                                    // },
                                    separateDialCode: true,
                                    preferredCountries: ["br", "us", "gb", "pt"],
                                    // utilsScript: "build/js/utils.js"
                                });
                            }
                            tel_input(input);
                        }
                    }).catch((e) => {
                        t(!1), console.error(e);
                    });
            })),
        (e._wf.addListeners = () => {
            const modal = document.getElementById('modal-promocao');
            
            //fechar modal
            modal.addEventListener('click', (e) => {
                if(e.target.className == 'fechar'){
                    modal.classList.remove('mostrar');
                }
            });    
            document.getElementById("formulario").addEventListener('submit', e._wf.addNewLead);
        }),
        (e._wf.addNewLead =  (x) => {
            x.preventDefault();
            const formulario = document.getElementById('formulario');
         
            // console.log('test');
            const valores = {};
            valores['id_form'] = e._wf.formId;
          
            for(let i=0; i<formulario.elements.length; i++){  
                if(formulario.elements[i].type != 'button' && formulario.elements[i].value != ''){
                    if(formulario.elements[i].name == 'telefone'){
                        const ddi = document.querySelector('.iti__selected-dial-code').textContent;
                        const form_value = formulario.elements[i].value;
                        const phone = ddi.concat(form_value);
                        
                        valores[formulario.elements[i].name] = phone;
                        // console.log(phone);
                    }else{
                        valores[formulario.elements[i].name] = formulario.elements[i].value;
                    }
                }
            }

            const data = JSON.stringify(valores);

            // new Promise(() => {
            //     fetch("https://api.innovaweb.com.br/lead/", {
            //         method: "POST",
            //         headers: { Accept: "application/json", "Content-Type": "application/json", Authorization: 'MzQ5MS4yMDkwNi4yODcyZDRmODYzOWIwY2JmNGMxODYzN2VkN2QwOTFiYTVkOWYyZDIyMWYyODMzOWEwNWVhNmJhOGE2ZDQ0YzYw'  },
            //         body: data,
            //     }).then((response)=>{
            //         // const modal = document.getElementById('modal-promocao');
            //         // modal.classList.remove('mostrar');
            //         console.log(response);
            //     }).catch((erro)=> {
            //         console.log(erro);
            //     })
            // }); 

            console.log(valores);
            console.log(data);
        }),
        (e._wf.newForm = (forms) => {
            //função resposavel por verificar e monta a estrutura do fomulario
            var form_elements = [];
        
            for(let i = 0; i< forms.length; i++){
                const name = forms[i].name;
                const new_name = name[0].toUpperCase() + name.substr(1);

                if(forms[i].type != 'button'){
                    if(forms[i].required == 'true'){
                        form_elements[i] = [
                            `<label>${new_name}</label><input class='input-form' type='${forms[i].type}' name='${forms[i].name}' placeholder='${forms[i].placeholder}' required>`
                        ];
                    }else{
                        form_elements[i] = [
                            `<label>${new_name}</label><input class='input-form' type='${forms[i].type}' name='${forms[i].name}' placeholder='${forms[i].placeholder}' >`
                        ];
                    }
                }else{
                    form_elements[i] = [
                        `<button class='button-form' type='submit' id="butao" name='${forms[i].name}' placeholder='${forms[i].placeholder}'>${forms[i].label}</button>`
                    ];
                }

                if(forms[i].name == 'telefone'){
                    form_elements[i] = [
                        `<label>${new_name}</label><input id="number" class='input-form' type='${forms[i].type}' name='${forms[i].name}' >`
                    ];
                }  
            }
            // console.log(form_elements);
            return  form_elements;

        }),
        (e._wf.init = async (t) => {
            await e._wf.injectBaseHtml(t);
            // await e._wf.injectBaseCss(t), e._wf.injectPhoneCss(t);
            await e._wf.injectPhoneJs(t), e._wf.injectPhoneUtils(t);
            await e._wf.addListeners();

            if (!(await e._wf.loadData())) throw "Failed to load data";
            if (!(await e._wf.injectBaseCss(t))) throw "Failed to load css";

        }),
        (e._wf.injectBaseHtml = (t) =>
            new Promise(async (n) => {
                let a = await e._wf.loadTemplate();
                if (!a) throw "Error loading template";

                await e._wf.injectBaseCss(t), e._wf.injectPhoneCss(t);
                
                t.body.insertAdjacentHTML("beforeend", a), n(!0);
        })),
        (e._wf.loadTemplate = () =>
            new Promise((e) => {
                fetch("http://127.0.0.1:5501/novo/index.html", { method: "GET" })
                    .then(async (t) => {
                        let n = await t.text();
                        e(n);
                    })
                    .catch((t) => {
                        e(!1);
                    });
        })),
        (e._wf.injectBaseCss = (e) =>
            new Promise((t) => {
                fetch("http://127.0.0.1:5501/novo/index.css", { method: "GET" })
                    .then(async (n) => {
                        let a = await n.text(),
                            o = e.createElement("style");
                        (o.textContent = a), e.head.append(o), t(!0);
                    })
                    .catch((e) => {
                        console.error(e), t(!1);
                    });
        })),
        (e._wf.injectPhoneCss = (e) =>
            new Promise((t) => {
                fetch("http://127.0.0.1:5501/novo/build/css/intlTelInput.css", { method: "GET" })
                    .then(async (n) => {
                        let a = await n.text(),
                            o = e.createElement("style");
                        (o.textContent = a), e.head.append(o), t(!0);
                      
                    })
                    .catch((e) => {
                        console.error(e), t(!1);
                    });
        })),
        (e._wf.injectPhoneJs = (e) =>
            new Promise((t) => {
                fetch("http://127.0.0.1:5501/novo/build/js/intlTelInput.js", { method: "GET" })
                    .then(async (n) => {
                        let a = await n.text(),
                            o = e.createElement("script");
                        (o.textContent = a), e.head.append(o), t(!0);
                    
                    })
                    .catch((e) => {
                        console.error(e), t(!1);
                    });   
        })),
        (e._wf.injectPhoneUtils = (e) =>
            new Promise((t) => {
                fetch("http://127.0.0.1:5501/novo/build/js/utils.js", { method: "GET" })
                    .then(async (n) => {
                        let a = await n.text(),
                            o = e.createElement("script");
                        (o.textContent = a), e.head.append(o), t(!0);
                    })
                    .catch((e) => {
                        console.error(e), t(!1);
                    });
        })),
        e._wf.init(t));
})(window, document);