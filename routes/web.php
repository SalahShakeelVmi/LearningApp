<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Illuminate\Http\Request;
/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

Route::prefix('dashboard')->group(function () {

    Route::middleware('auth')->group(function () {
        Route::get('/notifications',function(Request $request){

            if(isset($request->load)){     
                $notifications = auth()->user()->notifications()->paginate($request->load);
             
               
            }
            else{
            
                $notifications = auth()->user()->notifications()->paginate(5);
            }
            return Inertia::render('Notification/Index',[
                'notifications' => $notifications
            ]);

        })->name('notifications.index');

        Route::put('/notifications/update', function (Request $request) {
            auth()->user()->unreadNotifications->when($request->id, function ($query) use ($request) {
                return $query->where('id', $request->id);
            })->markAsRead();
        })->name('notification.update');

        Route::put('/notifications/update/all', function (Request $request) {
            auth()->user()->unreadNotifications->markAsRead();
        })->name('notification.update.all');
    });
    
});

require __DIR__.'/auth.php';
require __DIR__.'/dashboard/posts.php';
