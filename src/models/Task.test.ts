import { IAppointment } from "./Appointment";
import { customMatchers } from "../test/matchers";
import { Time, addHour, add30Minutes } from "./Time";
import { ITask, Task, isTask } from "./Task";
import moment from "moment"

describe("A Task", () => {
  beforeEach(() => {
    jasmine.addMatchers(customMatchers);
    Time.set(new Date(2019, 6, 20, 13, 1, 0, 0)); // 2019-07-20 at 1:01PM
  });

  describe("Given an ITask", () => {
    let itask: ITask;
    beforeEach(() => {
      itask = {
        id: 1,
        title: "ITask Instance",
        description: "This is a valid instance of the ITask interface",
        priority: 1,
        start: Time.current(),
        estimate: 1
      };
    });

    describe("When the instance is passed to the Task constructor, it...", () => {
      let task: Task;
      beforeEach(() => {
        task = new Task(itask);
      });

      it("Assigns the ITask instance properties to the Task instance", () => {
        const { description, estimate, id, start, title, priority } = task;
        expect({
          description,
          estimate,
          id,
          start,
          title,
          priority
        }).toEqual({ ...itask, priority: Time.now() });
      });

      it("Sets the End date based on the Start and Estimate", () => {
        expect(task.end).toEqual(new Date(2019, 6, 20, 13, 2, 0, 0));
      });

      it("Sets the Priority based on the Start", () => {
        expect(task.priority).toEqual(Time.now());
      });
    });
  });

  describe("Given no ITask instance", () => {
    describe("When nothing is passed to the Todo constructor, it...", () => {
      let task: Task;
      beforeEach(() => {
        task = new Task();
      });

      it("Defaults to an ID of the current date and time", () => {
        expect(task.id).toEqual(Time.now());
      });

      it("Defaults to an empty Title", () => {
        expect(task.title).toBe("");
      });

      it("Defaults to an empty Description", () => {
        expect(task.description).toBe("");
      });

      it("Defaults to incompleted", () => {
        expect(task.completed).toBeUndefined();
      });

      it("Defaults to a 60 minute Estimate", () => {
        expect(task.estimate).toBe(60);
      });

      it("Defaults to a Start of the current datetime", () => {
        expect(task.start.getTime()).toEqual(Time.now());
      });
    });
  });

  describe("Given an IAppointment", () => {
    let iappointment: IAppointment;
    beforeEach(() => {
      iappointment = {
        id: 1,
        title: "IAppointment Instance",
        description: "This is a valid instance of an IAppointment",
        priority: Time.current().getTime(),
        start: Time.current(),
        end: add30Minutes(Time.current())
      };
    });

    describe("When the instance is passed to the Task constructor, it...", () => {
      let task: Task;
      beforeEach(() => {
        task = new Task(iappointment);
      });

      it("Assigns the ITask instance properties to the Task instance", () => {
        const { description, estimate, id, start, title, priority, end } = task;
        expect({
          description,
          estimate: estimate || "none",
          id,
          start,
          title,
          priority,
          end
        }).toEqual({ ...iappointment, estimate: Task.periodToEstimate(iappointment) });
      });

      it("Sets the End date based on the Start and Estimate", () => {
        expect(task.end).toEqual(iappointment.end);
      });

      it("Sets the Priority based on the Start", () => {
        expect(task.priority).toEqual(Time.now());
      });
    });
  });
});

describe("The isTask function", () => {
  it("Returns true when given a task", () => {
    expect(isTask(new Task())).toBeTruthy();
  });

  it("Returns true when given a task with extra properties", () => {
    expect(isTask({ ...new Task(), extraProp: "Hello!" })).toBeTruthy();
  });

  it("Returns false when not given a task", () => {
    expect(isTask({ hello: "world" })).toBeFalsy();
  });

  it("Returns false when given an empty object", () => {
    expect(isTask({})).toBeFalsy();
  });
});
