'use strict';

var response = require('./res');
var connection = require('./koneksi');
const { isInteger } = require('lodash');

exports.index = function(req, res) {
    response.ok('APLIKASI REST API BERJALAN', res);
};

// MENAMPILKAN SEMUA DATA MAHASISWA
exports.datamahasiswa = function(req, res) {
    let page = req.query.page;
    console.log(page);
    let limit = 10;
    if (page === undefined || page === '') {
        page = 1;
    }
    let offset = page * 10;
    offset = offset - limit;
    connection.query(`SELECT * FROM mahasiswa LIMIT ? OFFSET ?`, [limit, offset], function(error, rows, fields) {
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

// MENAMPILKAN MATAKULIAH GROUP
exports.tampilgroupmatakuliah = function(req, res) {
    connection.query('SELECT mahasiswa.id, mahasiswa.nim, mahasiswa.nama, mahasiswa.jurusan, matakuliah.matakuliah, matakuliah.sks FROM krs JOIN matakuliah JOIN mahasiswa WHERE matakuliah.id = krs.matakuliah_id AND mahasiswa.id = krs.mahasiswa_id', function(error, rows, fields) {
        if (error) {
            console.log(error);
        } else {
            response.oknested(rows, res);
        }
    });
}