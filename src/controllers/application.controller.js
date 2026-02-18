import Application from '../models/application.model.js';

const allApplication = async (req, res) => {
  try {
    const userId = req.user.id;
    const { status, sortBy = '-appliedDate' } = req.query;

    let query = { userId };
    if (status) {
      query.status = status;
    }

    const applications = await Application.find(query).sort(sortBy).lean();

    return res.status(200).json({
      success: true,
      count: applications.length,
      applications
    });
  } catch (err) {
    console.error('Error in allApplication:', err);
    return res.status(500).json({
      success: false,
      message: err.message
    });
  }
}


const updateApplication = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;
    const updates = req.body;

    // ⚠️ Vérifie que l'application appartient au user
    const application = await Application.findOne({ _id: id, userId });

    if (!application) {
      return res.status(404).json({
        success: false,
        message: 'Application not found'
      });
    }

    // Update les champs autorisés
    const allowedUpdates = [
      'companyName',
      'position',
      'status',
      'followUpDate',
      'notes'
    ];

    allowedUpdates.forEach(field => {
      if (updates[field] !== undefined) {
        application[field] = updates[field];
      }
    });

    await application.save();

    return res.status(200).json({
      success: true,
      message: 'Application updated successfully',
      application
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

const createApplication = async (req, res) => {
  try {
    const userId = req.user.id; // ⚠️ Du middleware, pas du body !

    const {
      companyName,
      position,
      status = 'applied', // Default
      appliedDate,
      followUpDate,
      notes
    } = req.body;

    // Validation basique (Now handled by applicationValidator)

    // Auto-calcul followUpDate si non fourni
    let calculatedFollowUpDate = followUpDate;

    if (!calculatedFollowUpDate && appliedDate) {
      const applied = new Date(appliedDate);
      applied.setDate(applied.getDate() + 7); // +7 jours
      calculatedFollowUpDate = applied;
    }

    const application = new Application({
      userId, // ⚠️ De req.user, pas req.body
      companyName,
      position,
      status,
      appliedDate: appliedDate || new Date(),
      followUpDate: calculatedFollowUpDate,
      notes
    });

    await application.save();

    return res.status(201).json({
      success: true,
      message: 'Application created successfully',
      application
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

const deleteApplication = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;

    // ⚠️ FindOneAndDelete avec userId pour sécurité
    const application = await Application.findOneAndDelete({
      _id: id,
      userId
    });

    if (!application) {
      return res.status(404).json({
        success: false,
        message: 'Application not found'
      });
    }

    return res.status(200).json({
      success: true,
      message: 'Application deleted successfully'
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

export { allApplication, updateApplication, createApplication, deleteApplication };

