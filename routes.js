'use strict';

module.exports = function(app) {
    var jsonku = require('./controller');

    app.route('/').get(jsonku.index);

    app.route('/tampil').get(jsonku.datamahasiswa);

    app.route('/tampil/:id').get(jsonku.getDataMhsById);

    app.route('/tambah').post(jsonku.tambahMahasiswa);

    app.route('/ubah').put(jsonku.ubahMahasiswa);

    app.route('/hapus').delete(jsonku.hapusMahasiswa);
}