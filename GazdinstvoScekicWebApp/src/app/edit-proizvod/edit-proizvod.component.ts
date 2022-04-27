import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-edit-proizvod',
  templateUrl: './edit-proizvod.component.html',
  styleUrls: ['./edit-proizvod.component.scss']
})
export class EditProizvodComponent implements OnInit {

  @Input() proizvodId: number;
  constructor(public activeModal: NgbActiveModal) { }

  ngOnInit(): void {
  }

}
