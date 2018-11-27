export class AuthService{
    isAuth = false;
    popover;

    connect(){
        this.isAuth = true;
        this.popover.innerHTML = "You're now fictitiously connected !";
        this.popoverDisappearance();
    }
    disconnect(){
        this.isAuth = false;
        this.popover.innerHTML = "You're now disconnected... See you soon !";
        this.popoverDisappearance();
    }

    private timeoutInstance;
    popoverDisappearance(){
        if(this.timeoutInstance != undefined)
            clearTimeout(this.timeoutInstance);
            
        this.popover.style.visibility = "visible";
        this.popover.style.opacity = "1";
        this.timeoutInstance = setTimeout(() => {
            this.popover.style.opacity = "0";
            setTimeout(() => {
                this.popover.style.visibility = "hidden";
            }, 500);
        }, 4000);
    }
}