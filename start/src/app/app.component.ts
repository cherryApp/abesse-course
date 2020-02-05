import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  // 1. Hozz létre egy user objektumot: name, email, age, gender
  user = {
    name: 'Pistike',
    email: 'verpisitike@gmail.com',
    age: 13,
    gender: 'male'
  };

  // 2. Jelenítsd meg a user objektum értékeit a sablonban egymás alatti inputokkal.

  // 3. Készíts egy submit gombot a mezők alá, ami kattintásra hívja meg az onSubmit metódust.

  // 4. Az onSubmit metódust a console -ra logolja ki a user pillanatnyi értékét.

  onUserClickedOnMyAwesomeButton(user): void {
    console.log(user);
  }
}
