'use strict';

var response = require('./res');
var connection = require('./koneksi');

exports.index = function(req, res) {
    response.ok('APLIKASI REST API BERJALAN', res);
};

// MENAMPILKAN SEMUA DATA MAHASISWA
exports.datamahasiswa = function(req, res) {
    connection.query('SELECT * FROM mahasiswa', function(error, rows, fields) {
        if (error) {
            connection.log(error);
        } else {
            response.ok(rows, res);
        }
    });
}

// MENAMPILKAN DATA MAHASISWA BERDASARKAN ID
exports.getDataMhsById = function(req, res) {
    let id = req.params.id;
    connection.query('SELECT * FROM mahasiswa WHERE id = ?', [id], function(error, rows, fields) {
        if (error) {
            connection.log(error);
        } else {
            response.ok(rows, res);
        }
    });
}

// MENAMBAHKAN DATA MAHASISWA
exports.tambahMahasiswa = function(req, res) {
    var nim = req.body.nim;
    var nama = req.body.nama;
    var jurusan = req.body.jurusan;

    connection.query('INSERT INTO mahasiswa (nim, nama, jurusan) VALUES(?, ?, ?)', [nim, nama, jurusan], function(error, rows, fields) {
        if (error) {
            connection.log(error);
        } else {
            response.ok('BERHASIL MENAMBAH DATA', res);
        }
    });
}

// UBAH DATA BERDASARKAN ID
exports.ubahMahasiswa = function(req, res) {
    var id = req.body.id;
    var nim = req.body.nim;
    var nama = req.body.nama;
    var jurusan = req.body.jurusan;

    connection.query('UPDATE mahasiswa SET nim=?, nama=?, jurusan=? WHERE id=?', [nim, nama, jurusan, id], function(error, rows, fields) {
        if (error) {
            connection.log(error);
        } else {
            response.ok('BERHASIL UBAH DATA', res);
        }
    });
}

// MENGHAPUSDATA BERDASARKAN ID
exports.hapusMahasiswa = function(req, res) {
    var id = req.body.id;
    connection.query('DELETE FROM mahasiswa WHERE id=?', [id], function(error, rows, fields) {
        if (error) {
            connection.log(error);
        } else {
            response.ok('BERHASIL HAPUS DATA', res);
        }
    });
}