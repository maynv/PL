import { Component, OnChanges,EventEmitter , Input, Output } from "../../../node_modules/@angular/core";


@Component({
    selector : 'pm-star',
    templateUrl :'./star.component.html',
    styleUrls : ['./star.component.css']
})

export class StarComponent implements OnChanges {
    starWidth : number;
    @Input() rating : number ;
    @Input() price : number;
    @Output() ratingClicked : EventEmitter<string> = 
             new EventEmitter<string>();

    ngOnChanges(): void{
        this.starWidth=this.rating * 75 / 5;
    }

    onClick() : void {
        this.ratingClicked.emit(`${this.rating} `);
    }
}