{

  const MAX_SIZE = 6;
  const MONDAY = 0;
  const TUESDAY = 1;
  const WEDNESDAY = 2;
  // enum 이전 
  const DAYS = Object.freeze({ MONDAY: 0, TUESDAY: 1, WEDNESDAY: 2 });
  const today = DAYS.MONDAY;
  console.log('today = ', today);
  // union type
  type unionWeek = 'Monday' | 'Tuesday' | 'Wednesday';

  enum Week {
    //Monday = 'monday' 
    Monday = 1,
    Tuesday,
    Wednesday,
    Thursday,
    Friday,
    Saturday,
    Sunday,
  }
  console.log(Week.Monday);

  let day: Week = Week.Saturday;
  day = Week.Tuesday;

  day = 10; // error 
  console.log('day = ', day);

  let day2: unionWeek = 'Monday';
  day2 = 'Wednesday';
  console.log('day2 = ', day2);
  // type Errors = 'error message simple version' | 'error message complicated version' | 'error message complicated detail version';


  enum Errors {
    Short = 'error message simple version',
    Long = 'error message complicated version',
    Detail = 'error message complicated detail version'
  }

  let err: Errors = Errors.Long;
  //err = 'error other error ';
  console.log(err);

}
