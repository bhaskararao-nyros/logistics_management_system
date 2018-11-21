<!DOCTYPE html>
<html lang="{{ app()->getLocale() }}">
<head>
 <meta charset="utf-8">
 <meta http-equiv="X-UA-Compatible" content="IE=edge">
 <meta name="viewport" content="width=device-width, initial-scale=1">
 <!-- CSRF Token -->
 <meta name="csrf-token" content="{{ csrf_token() }}">
 <title>Logistics Mangement System - LMS</title>

</head>
<body>

<section id="app">
	<main-app></main-app>
</section>

<script>
 window.Laravel = <?php echo json_encode([
 'csrfToken' => csrf_token(),
 ]); ?>
</script>

 <script src="{{ mix('js/app.js') }}"></script>
</body>
</html>