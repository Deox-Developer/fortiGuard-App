import { Component } from '@angular/core';
import { ProfileService } from '../../services/profile.service';




@Component({
  selector: 'app-form-update-account',
  standalone: true,
  imports: [],
  templateUrl: './form-update-account.component.html',
  styleUrl: './form-update-account.component.css'
})
export class FormUpdateAccountComponent {

  idUpdateAcc: number | null = null;

  constructor(private rofileService: ProfileService) {}

  // Método para utilizar saveDataAcc
  ngOnInit(): void {
    if (this.idUpdateAcc !== null) {
      this.rofileService.saveDataAcc(this.idUpdateAcc);
      console.log(this.rofileService)
    }else{
      console.log('Esto es el form updateACC error')
    }
  }
 
}