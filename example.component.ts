import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-example',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './example.component.html',
  styleUrls: ['./example.component.css']
})
export class ExampleComponent implements OnInit {

  formulario!: FormGroup;

  // Lista de categorías disponibles
  categories = [
    { idCategory: 1, text: 'Abarrotes' },
    { idCategory: 2, text: 'Electrónica' },
    { idCategory: 3, text: 'Ropa' },
    { idCategory: 4, text: 'Tecnología' }
  ];

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.formulario = this.fb.group({
      title: ['', Validators.required],
      price: [null, [Validators.required, Validators.min(0.01)]],
      description: ['', Validators.required],
      categoryId: [null, [Validators.required, Validators.min(1)]]
    });
  }

  submitForm(): void {
    if (this.formulario.invalid) {
      console.warn('Formulario inválido. Verifique los campos.');
      return;
    }

    const producto = {
      ...this.formulario.value,
      images: ['https://example.com']
    };

    fetch('https://api.escuelajs.co/api/v1/products', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(producto)
    })
    .then(res => res.json())
    .then(data => {
      console.log('Producto creado con éxito:', data);
      this.formulario.reset();
    })
    .catch(error => {
      console.error('Error al crear el producto:', error);
    });
  }

}
