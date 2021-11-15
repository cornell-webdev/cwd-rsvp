export const courseName = (course: any): string => {
  if (!course) return ''
  if (course.data) return `${course.data.subject} ${course.data.catalogNbr}`
  else return `${course.subject} ${course.catalogNbr}`
}

export const requirementCredits = (requirement: any): number => {
  if (!requirement) return 0
  if (requirement.assignedCourse) {
    return requirement.assignedCourse.enrollGroups[0].unitsMaximum
  } else {
    return requirement.credits
  }
}
