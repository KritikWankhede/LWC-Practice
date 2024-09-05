import { LightningElement } from 'lwc';

export default class DigitalClock extends LightningElement {
    isLoaded = false;

    renderedCallback() {
        if (this.isLoaded) {
            console.log('Inside renderedCallback');
            console.log('this.isLoaded', this.isLoaded, ' isLoaded!!!');
            return;
        } else {
            this.clockOnScreen();
            this.isLoaded = true;
        }
    }

    clockOnScreen() {
        console.log('Inside clockOnScreen');
        setInterval(() => {
            let hours = this.template.querySelector('.hours');
            let minutes = this.template.querySelector('.minutes');
            let seconds = this.template.querySelector('.seconds');
            let ampm = this.template.querySelector('.ampm');
    
            if (hours && minutes && seconds && ampm) {
                let hh = this.template.querySelector('.hh');
                let mm = this.template.querySelector('.mm');
                let ss = this.template.querySelector('.ss');
    
                let dotH = this.template.querySelector('.h_dot');
                let dotM = this.template.querySelector('.m_dot');
                let dotS = this.template.querySelector('.s_dot');
    
                let h = new Date().getHours();
                let m = new Date().getMinutes();
                let s = new Date().getSeconds();
                let ap = h >= 12 ? 'PM' : 'AM';
    
                if (h > 12) {
                    h = h - 12;
                }
    
                h = h < 10 ? '0' + h : h;
                m = m < 10 ? '0' + m : m;
                s = s < 10 ? '0' + s : s;
    
                hours.innerHTML = h + ' Hours';
                minutes.innerHTML = m + ' Minutes';
                seconds.innerHTML = s + ' Seconds';
                ampm.innerHTML = ap;
    
                hh.style.strokeDashoffset = 440 - (440 * h) / 12;
                mm.style.strokeDashoffset = 440 - (440 * m) / 60;
                ss.style.strokeDashoffset = 440 - (440 * s) / 60;
    
                dotH.style.transform = `rotate(${h * 30}deg)`;
                dotM.style.transform = `rotate(${m * 6}deg)`;
                dotS.style.transform = `rotate(${s * 6}deg)`;
            } else {
                console.error('One or more elements not found');
            }
        }, 1000);
    }
    
}
