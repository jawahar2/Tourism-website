import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterComponent } from './register.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';

describe('RegisterComponent', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegisterComponent ],
      imports:[HttpClientModule,FormsModule,ReactiveFormsModule,RouterTestingModule],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('form should be invalid', async(()=>{
    component.registerForm.controls['contactNo'].setValue('')
    component.registerForm.controls['password'].setValue('')
    component.registerForm.controls['emailId'].setValue('')
    component.registerForm.controls['name'].setValue('')
    expect(component.registerForm.valid).toBeFalsy();

  }));
  it('form should be valid', async(()=>{
    component.registerForm.controls['contactNo'].setValue('9098765432')
    component.registerForm.controls['password'].setValue('Abc@1234')
    component.registerForm.controls['emailId'].setValue('abc@infy.com')
    component.registerForm.controls['name'].setValue('jai')
    expect(component.registerForm.valid).toBeTruthy();


  }))
});
