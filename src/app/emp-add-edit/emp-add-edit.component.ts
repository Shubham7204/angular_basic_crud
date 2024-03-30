import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { EmployeeService } from '../employee.service';

@Component({
  selector: 'app-emp-add-edit',
  templateUrl: './emp-add-edit.component.html',
  styleUrls: ['./emp-add-edit.component.css'],
})
export class EmpAddEditComponent implements OnInit {
  empForm: FormGroup;

  education: string[] = [
    'Matric',
    'Diploma',
    'Intermediate',
    'Graduate',
    'Post Graduate',
  ];

  constructor(
    private empService: EmployeeService,
    private dialogRef: MatDialogRef<EmpAddEditComponent>,
    private formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {
    this.empForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', Validators.required],
      dob: ['', Validators.required],
      gender: ['', Validators.required],
      education: ['', Validators.required],
      course: ['', Validators.required],
      semester: ['', Validators.required], // Added semester field
      mobile: ['', Validators.required]    // Added mobile field
    });    
  }

  ngOnInit(): void {
    this.empForm.patchValue(this.data);
  }

  onSubmit() {
    if (this.empForm.valid) {
      if (this.data) {
        this.empService
          .updateEmployee(this.data.id, this.empForm.value)
          .subscribe({
            next: (val: any) => {
              alert('Employee details updated!');
              this.dialogRef.close(true);
            },
            error: (err: any) => {
              console.error(err);
              alert("Error while updating the employee!");
            },
          });
      } else {
        this.empService.addEmployee(this.empForm.value).subscribe({
          next: (val: any) => {
            alert('Employee added successfully!');
            this.empForm.reset();
            this.dialogRef.close(true);
          },
          error: (err: any) => {
            console.error(err);
            alert("Error while adding the employee!");
          },
        });
      }
    }
  }
}
