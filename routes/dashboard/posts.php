<?php
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\PostController;

Route::prefix('dashboard')->group(function () {
    Route::middleware(['auth'])->group(function () {
        Route::resource('posts', PostController::class);     
    });
});