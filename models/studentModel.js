const { pool, isDbConnected } = require('../config/db');

// In-Memory Seed Fallback (Active if MySQL server is not locally running)
let inMemoryStudents = [
  {
    id: 'STU-2024-001',
    full_name: 'Aarav Sharma',
    email: 'aarav.sharma@example.com',
    phone: '9876543210',
    dob: '2003-05-14',
    gender: 'Male',
    department: 'Computer Science & Engineering',
    semester: 'Semester 6',
    cgpa: 8.90,
    status: 'Active',
    address: 'Bengaluru, Karnataka',
    admission_date: '2023-08-10',
    created_at: new Date().toISOString()
  },
  {
    id: 'STU-2024-002',
    full_name: 'U B Aiswarya',
    email: 'aiswarya.ub@example.com',
    phone: '9123456780',
    dob: '2004-03-22',
    gender: 'Female',
    department: 'Information Technology',
    semester: 'Semester 8',
    cgpa: 9.20,
    status: 'Active',
    address: 'Chennai, Tamil Nadu',
    admission_date: '2023-08-01',
    created_at: new Date().toISOString()
  },
  {
    id: 'STU-2024-003',
    full_name: 'Rohan Varma',
    email: 'rohan.varma@example.com',
    phone: '9845123456',
    dob: '2003-11-09',
    gender: 'Male',
    department: 'Electronics & Communication',
    semester: 'Semester 6',
    cgpa: 8.40,
    status: 'Active',
    address: 'Hyderabad, Telangana',
    admission_date: '2023-08-12',
    created_at: new Date().toISOString()
  },
  {
    id: 'STU-2024-004',
    full_name: 'Pooja Hegde',
    email: 'pooja.hegde@example.com',
    phone: '9731245678',
    dob: '2004-07-19',
    gender: 'Female',
    department: 'Computer Science & Engineering',
    semester: 'Semester 4',
    cgpa: 8.70,
    status: 'Active',
    address: 'Mangalore, Karnataka',
    admission_date: '2024-08-05',
    created_at: new Date().toISOString()
  },
  {
    id: 'STU-2024-005',
    full_name: 'Karthik Nair',
    email: 'karthik.nair@example.com',
    phone: '9447123987',
    dob: '2002-12-30',
    gender: 'Male',
    department: 'Data Science & AI',
    semester: 'Semester 8',
    cgpa: 9.00,
    status: 'Active',
    address: 'Kochi, Kerala',
    admission_date: '2023-07-28',
    created_at: new Date().toISOString()
  }
];

class StudentModel {
  /**
   * Retrieve all students with optional search, department filter, and sorting
   */
  static async getAll({ search, department, sortBy }) {
    if (isDbConnected()) {
      let query = 'SELECT * FROM students WHERE 1=1';
      const params = [];

      if (search) {
        query += ' AND (full_name LIKE ? OR id LIKE ? OR email LIKE ?)';
        const term = `%${search}%`;
        params.push(term, term, term);
      }

      if (department && department !== 'All') {
        query += ' AND department = ?';
        params.push(department);
      }

      // Safe sorting logic
      switch (sortBy) {
        case 'name-desc':
          query += ' ORDER BY full_name DESC';
          break;
        case 'cgpa-desc':
          query += ' ORDER BY cgpa DESC';
          break;
        case 'id-asc':
          query += ' ORDER BY id ASC';
          break;
        case 'name-asc':
        default:
          query += ' ORDER BY full_name ASC';
          break;
      }

      const [rows] = await pool.query(query, params);
      return rows;
    }

    // In-memory fallback
    let list = [...inMemoryStudents];

    if (search) {
      const q = search.toLowerCase();
      list = list.filter(
        (s) =>
          s.full_name.toLowerCase().includes(q) ||
          s.id.toLowerCase().includes(q) ||
          s.email.toLowerCase().includes(q)
      );
    }

    if (department && department !== 'All') {
      list = list.filter((s) => s.department === department);
    }

    switch (sortBy) {
      case 'name-desc':
        list.sort((a, b) => b.full_name.localeCompare(a.full_name));
        break;
      case 'cgpa-desc':
        list.sort((a, b) => (parseFloat(b.cgpa) || 0) - (parseFloat(a.cgpa) || 0));
        break;
      case 'id-asc':
        list.sort((a, b) => a.id.localeCompare(b.id));
        break;
      case 'name-asc':
      default:
        list.sort((a, b) => a.full_name.localeCompare(b.full_name));
        break;
    }

    return list;
  }

  /**
   * Retrieve a student by ID
   */
  static async getById(id) {
    if (isDbConnected()) {
      const [rows] = await pool.query('SELECT * FROM students WHERE id = ?', [id]);
      return rows[0] || null;
    }

    return inMemoryStudents.find((s) => s.id === id) || null;
  }

  /**
   * Retrieve a student by Email
   */
  static async getByEmail(email) {
    if (isDbConnected()) {
      const [rows] = await pool.query('SELECT * FROM students WHERE email = ?', [email]);
      return rows[0] || null;
    }

    return inMemoryStudents.find((s) => s.email.toLowerCase() === email.toLowerCase()) || null;
  }

  /**
   * Create / Register a new student
   */
  static async create(studentData) {
    const {
      id,
      full_name,
      email,
      phone,
      dob,
      gender,
      department,
      semester,
      cgpa,
      status = 'Active',
      address = null,
      admission_date = new Date().toISOString().split('T')[0]
    } = studentData;

    if (isDbConnected()) {
      const query = `
        INSERT INTO students (id, full_name, email, phone, dob, gender, department, semester, cgpa, status, address, admission_date)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `;
      await pool.query(query, [
        id,
        full_name,
        email,
        phone,
        dob,
        gender,
        department,
        semester,
        cgpa,
        status,
        address,
        admission_date
      ]);

      return this.getById(id);
    }

    const newRecord = {
      id,
      full_name,
      email,
      phone,
      dob,
      gender,
      department,
      semester,
      cgpa: parseFloat(cgpa) || null,
      status,
      address,
      admission_date,
      created_at: new Date().toISOString()
    };

    inMemoryStudents.unshift(newRecord);
    return newRecord;
  }

  /**
   * Update an existing student record
   */
  static async update(id, updateData) {
    if (isDbConnected()) {
      const allowedFields = [
        'full_name',
        'email',
        'phone',
        'dob',
        'gender',
        'department',
        'semester',
        'cgpa',
        'status',
        'address'
      ];

      const setClauses = [];
      const values = [];

      allowedFields.forEach((field) => {
        if (updateData[field] !== undefined) {
          setClauses.push(`${field} = ?`);
          values.push(updateData[field]);
        }
      });

      if (setClauses.length === 0) return this.getById(id);

      values.push(id);
      const query = `UPDATE students SET ${setClauses.join(', ')} WHERE id = ?`;
      await pool.query(query, values);

      return this.getById(id);
    }

    const index = inMemoryStudents.findIndex((s) => s.id === id);
    if (index === -1) return null;

    inMemoryStudents[index] = {
      ...inMemoryStudents[index],
      ...updateData,
      id // preserve ID
    };

    return inMemoryStudents[index];
  }

  /**
   * Delete a student by ID
   */
  static async delete(id) {
    if (isDbConnected()) {
      const [result] = await pool.query('DELETE FROM students WHERE id = ?', [id]);
      return result.affectedRows > 0;
    }

    const initialLen = inMemoryStudents.length;
    inMemoryStudents = inMemoryStudents.filter((s) => s.id !== id);
    return inMemoryStudents.length < initialLen;
  }

  /**
   * Calculate summary statistics
   */
  static async getStats() {
    if (isDbConnected()) {
      const [stats] = await pool.query(`
        SELECT
          COUNT(*) AS total_students,
          COUNT(DISTINCT department) AS total_departments,
          ROUND(AVG(cgpa), 2) AS average_cgpa,
          SUM(CASE WHEN gender = 'Female' THEN 1 ELSE 0 END) AS female_count,
          SUM(CASE WHEN gender = 'Male' THEN 1 ELSE 0 END) AS male_count
        FROM students
      `);
      return stats[0];
    }

    const total = inMemoryStudents.length;
    const depts = new Set(inMemoryStudents.map((s) => s.department)).size;
    const avg = total > 0
      ? (inMemoryStudents.reduce((acc, curr) => acc + (parseFloat(curr.cgpa) || 0), 0) / total).toFixed(2)
      : '0.00';
    const females = inMemoryStudents.filter((s) => s.gender === 'Female').length;
    const males = inMemoryStudents.filter((s) => s.gender === 'Male').length;

    return {
      total_students: total,
      total_departments: depts,
      average_cgpa: avg,
      female_count: females,
      male_count: males
    };
  }
}

module.exports = StudentModel;
