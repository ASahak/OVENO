class MainConstructor {
    windowClick (bool, condition, className, hint){
        window.onclick =(e)=>{
            if (e.target && hint && hint === 'noClose' && e.target.closest('.'+className)) {
                condition.classList.add(className)
            } else if(bool && condition.closest('.'+className)){
                condition.classList.remove(className)
            }
            bool = true
        }
    }
}

export class ModalToggle extends MainConstructor{
    constructor(){
        super()
        this.modal = null
    }
    showModal (target, bool, hint) {
        if(document.querySelector('.show_modal_bar') && document.querySelector('.show_modal_bar') !== target){
            document.querySelector('.show_modal_bar').classList.remove('show_modal_bar')
        }
        target.classList.toggle('show_modal_bar');
        this.modal = target
        this.windowClick(bool, target, 'show_modal_bar', hint)
    }
    customHideModal () {
        this.modal && this.modal.classList.remove('show_modal_bar')
    }
}