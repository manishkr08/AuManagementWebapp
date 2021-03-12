import Course from './Course';
import AssesmentType from './enums/AssesmentType';
import Skill from './Skill';
import Tag from './Tag';

export default class Assessment {
  id?: number;
  name?: string;
  type?: AssesmentType;
  description?: string;
  course?: Course;
  creatorId?: number;
  maxMarks?: number;
  version?: number;
  tags?: Tag[];
  dateCreated?: Date;
  dateModified?: Date;
  prerequisite?: Skill[];
}
