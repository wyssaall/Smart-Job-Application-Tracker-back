import { body, validationResult } from 'express-validator';

// Middleware pour attraper les erreurs de validation
const handleValidationErrors = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            success: false,
            errors: errors.array().map(err => ({
                field: err.path,
                message: err.msg
            }))
        });
    }
    next();
};

const registerValidator = [
    body('fullname')
        .trim()
        .notEmpty().withMessage('Full name is required')
        .isLength({ min: 3 }).withMessage('Name must be at least 3 characters'),
    body('email')
        .isEmail().withMessage('Please provide a valid email')
        .normalizeEmail(),
    body('password')
        .isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
    handleValidationErrors
];

const loginValidator = [
    body('email').isEmail().withMessage('Valid email is required'),
    body('password').notEmpty().withMessage('Password is required'),
    handleValidationErrors
];

const applicationValidator = [
    body('companyName')
        .trim()
        .notEmpty().withMessage('Company name is required'),
    body('position')
        .trim()
        .notEmpty().withMessage('Position is required'),
    body('status')
        .optional()
        .isIn(['applied', 'interviewing', 'rejected', 'hired'])
        .withMessage('Invalid status'),
    body('appliedDate')
        .optional()
        .isISO8601().withMessage('Invalid date format (ISO8601 required)'),
    body('followUpDate')
        .optional()
        .isISO8601().withMessage('Invalid date format (ISO8601 required)'),
    handleValidationErrors
];

export { registerValidator, loginValidator, applicationValidator };
