((e, t) => {
    e._wf ||
        ((e._wf = {  flowStarted: !1, d: t, g: e, publicAuth: '', userData: null }),
        (e._wf.loadData = () =>
            new Promise((t) => {
                fetch("https://api.innovaweb.com.br/form/31753/json", { method: "GET", headers: { Accept: "application/json", "Content-Type": "application/json", Authorization: e._wf.publicAuth } })
                    .then(async (n) => {
                        // let a = await n.json();
                        //  let { name: a, type: o, placeholder: r} = await n.json();
                        // (e._wf.userData = {  name: a, type: o, placeholder: r}), t(!0);
                      
                        // console.log(n.json());
                        return n.json();
                    })
                    .then(forms => {
                        const formulario = document.getElementById('formulario');
                        // const form_name = forms.map(form => form.name).join("\n");
                        // const form_placeholder = forms.map(form => form.placeholder).join("\n");
                        // const form_type = forms.map(form => form.type).join("\n");

                        formulario.innerHTML = e._wf.newForm(forms);
                       
                      })
                    .catch((e) => {
                        t(!1), console.error(e);
                    });
            })),
            (e._wf.addListeners = () => {
                document.querySelector(".wf-send-container").addEventListener("click", e._wf.answear),
                    document.querySelector(".wf-input").addEventListener("keydown", e._wf.handleInput),
                    document.querySelector(".wf-input").addEventListener("keyup", e._wf.handleInputLength),
                    document.querySelector(".wf-button-outline").addEventListener("click", e._wf.toggleButton),
                    document.querySelector(".wf-tooltip").addEventListener("click", e._wf.openChat),
                    document.querySelector(".wf-close").addEventListener("click", e._wf.closeChat);
            }),
            (e._wf.newForm = (forms) => {
 
            console.log(forms[0].placeholder);
            
            var a = [];
            for(let i = 0; i< forms.length; i++){
              
                 a[i] = [
                    `<input type=${forms[i].type} name=${forms[i].name} placeholder='${forms[i].placeholder}' > `
                ];
            
            } 
            return  a;

            }),
        (e._wf.init = async (t) => {
            if (!(await e._wf.loadData())) throw "Failed to load data";
            if (!(await e._wf.injectBaseCss(t))) throw "Failed to load css";
            await e._wf.injectBaseHtml(t), e._wf.addListeners();
        }),
        (e._wf.injectBaseCss = (e) =>
            new Promise((t) => {
                fetch("https://gdigital.sfo2.digitaloceanspaces.com/s3/general/whatschat/template.css", { method: "GET" })
                    .then(async (n) => {
                        let a = await n.text(),
                            o = e.createElement("style");
                        (o.textContent = a), e.head.append(o), t(!0);
                    })
                    .catch((e) => {
                        console.error(e), t(!1);
                    });
            })),
        (e._wf.injectBaseHtml = (t) =>
            new Promise(async (n) => {
                let a = await e._wf.loadTemplate();
                if (!a) throw "Error loading template";
                // let { name: o, profile_picture: r, whatsapp: s } = e._wf.userData;
                console.log(e._wf);
                (a = a.replace("{{name}}", "teste").replace("{{profile_picture}}", 'LSC.png').replace("{{profile_picture}}", 'LSC.png').replace("{{whatsapp}}", 'teste')), t.body.insertAdjacentHTML("beforeend", a), n(!0);
            })),
        (e._wf.loadTemplate = () =>
            new Promise((e) => {
                fetch("https://gdigital.sfo2.digitaloceanspaces.com/s3/general/whatschat/template.html", { method: "GET" })
                    .then(async (t) => {
                        let n = await t.text();
                        e(n);
                    })
                    .catch((t) => {
                        e(!1);
                    });
            })),
        (e._wf.openChat = () => {
            document.querySelector(".wf-container").classList.remove("wf-container-hidden"),
                document.querySelector(".wf-tooltip").classList.add("wf-tooltip-hidden"),
                document.querySelector(".wf-button-outline").classList.add("wf-button-outline-open"),
                document.querySelector(".wf-button").classList.add("wf-button-open")
            
        }),
        (e._wf.closeChat = () => {
            document.querySelector(".wf-container").classList.add("wf-container-hidden"),
                document.querySelector(".wf-button-outline").classList.remove("wf-button-outline-open"),
                document.querySelector(".wf-button").classList.remove("wf-button-open");
        }),
        (e._wf.toggleButton = () => {
            document.querySelector(".wf-container").classList.contains("wf-container-hidden") ? e._wf.openChat() : e._wf.closeChat();
        }),
        e._wf.init(t));
})(window, document);
