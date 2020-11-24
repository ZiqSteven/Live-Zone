import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';


@Injectable({
  providedIn: 'root'
})
export class AlertService {

  constructor() { }

  /**
   * Mostrar una alerta personalizada con sweetAlert
   * @param text Texto que se va a mostrar en el alert
   */
  public showSuccesAlert(message: string) {
    Swal.fire({
      icon: 'success',
      title: 'Muy bien...',
      text: message,
      showConfirmButton: false
    });
  }

  public showWarningAlert(message: string) {
    Swal.fire({
      icon: 'warning',
      title: 'Atención',
      text: message,
    });
  }

  public showWrongAlert(message: string) {
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: message,
      footer: '<a href>¿Por qué sucede esto?</a>'
    });
  }

}
