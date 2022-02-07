import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EstadosService } from './services/estados/estados.service';
import { PaisesService } from './services/paises/paises.service';
import { PersonaService } from './services/persona/persona.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  personaForm: FormGroup;
  paises: any;
  estados: any;

  constructor(
    public fb: FormBuilder,
    public estadoService: EstadosService,
    public paisesService: PaisesService,
    public personaService: PersonaService
  ) {

  }
  ngOnInit(): void {
    this.personaForm = this.fb.group({

      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      edad: ['', Validators.required],
      pais: ['', Validators.required],
      estado: ['', Validators.required],
    });;

    this.paisesService.getAllPaises().subscribe(resp => {
      this.paises = resp;
      // console.log(resp);
    },
      error => { console.error(error) });
  }

  guardar(): void {
    this.personaService.savePersona(this.personaForm.value).subscribe(resp => {

    },
      error => { console.error(error) }
    )
  }

  cargarEstadosPorPaisId(event: any) {
    //console.log(event);
    this.estadoService.getAllEstadosByPais(event.target.value).subscribe(resp => {
      this.estados = resp;
    },
      error => { console.error(error) }
    );
  }

}
