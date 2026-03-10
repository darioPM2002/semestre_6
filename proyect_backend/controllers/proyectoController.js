const pool = require('../db');


// Obtener todos los proyectos
exports.getAllProyectos = async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT * FROM proyecto ORDER BY fechaCreacion DESC'
    );

    res.json(result.rows);

  } catch (error) {
    console.error('Error al obtener los proyectos:', error);
    res.status(500).json({ error: 'Error al obtener los proyectos' });
  }
};



// Obtener proyecto por folio
exports.getProyectoById = async (req, res) => {
  try {

    const result = await pool.query(
      'SELECT * FROM proyecto WHERE folio = $1',
      [req.params.folio]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Proyecto no encontrado' });
    }

    res.json(result.rows[0]);

  } catch (error) {
    console.error('Error al obtener el proyecto:', error);
    res.status(500).json({ error: 'Error al obtener el proyecto' });
  }
};



// Crear proyecto
exports.createProyecto = async (req, res) => {

  const {
    nombreProyecto,
    fechaActualizacion,
    tipoIniciativa,
    CR,
    patrocinador,
    socioNegocio,
    descripcionGeneral,
    objetivoIniciativa,
    requerimientosNegocio,
    beneficios,
    participacionAreas,
    supuestos,
    exclusiones,
    restricciones,
    anexos
  } = req.body;


  if (!nombreProyecto) {
    return res.status(400).json({
      error: 'El nombre del proyecto es obligatorio'
    });
  }

  try {

    const result = await pool.query(
      `INSERT INTO proyecto
      (nombreProyecto, fechaActualizacion, tipoIniciativa, CR, patrocinador,
       socioNegocio, descripcionGeneral, objetivoIniciativa, requerimientosNegocio,
       beneficios, participacionAreas, supuestos, exclusiones, restricciones, anexos)
       
       VALUES
       ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15)
       
       RETURNING *`,
      [
        nombreProyecto,
        fechaActualizacion,
        tipoIniciativa,
        CR,
        patrocinador,
        socioNegocio,
        descripcionGeneral,
        objetivoIniciativa,
        requerimientosNegocio,
        beneficios,
        participacionAreas,
        supuestos,
        exclusiones,
        restricciones,
        anexos
      ]
    );

    res.status(201).json(result.rows[0]);

  } catch (error) {
    console.error('Error al crear el proyecto:', error);
    res.status(500).json({ error: 'Error al crear el proyecto' });
  }
};



// Actualizar proyecto
exports.updateProyecto = async (req, res) => {

  const folio = req.params.folio;

  const {
    nombreProyecto,
    fechaActualizacion,
    tipoIniciativa,
    CR,
    patrocinador,
    socioNegocio,
    descripcionGeneral,
    objetivoIniciativa,
    requerimientosNegocio,
    beneficios,
    participacionAreas,
    supuestos,
    exclusiones,
    restricciones,
    anexos
  } = req.body;


  if (!nombreProyecto) {
    return res.status(400).json({
      error: 'El nombre del proyecto es obligatorio'
    });
  }

  try {

    const check = await pool.query(
      'SELECT * FROM proyecto WHERE folio = $1',
      [folio]
    );

    if (check.rows.length === 0) {
      return res.status(404).json({ error: 'Proyecto no encontrado' });
    }


    const result = await pool.query(
      `UPDATE proyecto SET
        nombreProyecto = $1,
        fechaActualizacion = $2,
        tipoIniciativa = $3,
        CR = $4,
        patrocinador = $5,
        socioNegocio = $6,
        descripcionGeneral = $7,
        objetivoIniciativa = $8,
        requerimientosNegocio = $9,
        beneficios = $10,
        participacionAreas = $11,
        supuestos = $12,
        exclusiones = $13,
        restricciones = $14,
        anexos = $15
       
       WHERE folio = $16
       
       RETURNING *`,
      [
        nombreProyecto,
        fechaActualizacion,
        tipoIniciativa,
        CR,
        patrocinador,
        socioNegocio,
        descripcionGeneral,
        objetivoIniciativa,
        requerimientosNegocio,
        beneficios,
        participacionAreas,
        supuestos,
        exclusiones,
        restricciones,
        anexos,
        folio
      ]
    );

    res.json(result.rows[0]);

  } catch (error) {
    console.error('Error al actualizar el proyecto:', error);
    res.status(500).json({ error: 'Error al actualizar el proyecto' });
  }
};



// Eliminar proyecto
exports.deleteProyecto = async (req, res) => {

  const folio = req.params.folio;

  try {

    const check = await pool.query(
      'SELECT * FROM proyecto WHERE folio = $1',
      [folio]
    );

    if (check.rows.length === 0) {
      return res.status(404).json({ error: 'Proyecto no encontrado' });
    }

    await pool.query(
      'DELETE FROM proyecto WHERE folio = $1',
      [folio]
    );

    res.json({
      message: 'Proyecto eliminado con éxito'
    });

  } catch (error) {
    console.error('Error al eliminar el proyecto:', error);
    res.status(500).json({ error: 'Error al eliminar el proyecto' });
  }
};