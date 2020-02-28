import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { ObjectFileComponent } from "./object-file.component";

describe("ImageComponent", () => {
  let component: ObjectFileComponent;
  let fixture: ComponentFixture<ObjectFileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ObjectFileComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ObjectFileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
