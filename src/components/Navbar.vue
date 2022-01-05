<template>
    <div class="container">
        <nav class="navbar navbar-expand-lg navbar-light bg-light bg-navbar">
            <div class="container">
                <a class="navbar-brand" href="#">网罗天下图书&emsp;传承中华文明</a>
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse justify-content-end" id="navbarSupportedContent">
                    <ul class="navbar-nav me-auto mb-2 mb-lg-0 justify-content-end">
                        <li class="nav-item">
                        <a class="nav-link active" aria-current="page" @click="$router.push('/homepage/webbook')">前端</a>
                        </li>
                        <li class="nav-item">
                        <a class="nav-link" @click="$router.push('/homepage/computerbook')">后端</a>
                        </li>
                        <li class="nav-item">
                        <a class="nav-link" @click="$router.push('/homepage/webbook')">编程</a>
                        </li>
                        <li class="nav-item">
                        <a class="nav-link" @click="$router.push('/homepage/computerbook')">计算机</a>
                        </li>
                        <li class="nav-item">
                        <a class="nav-link" @click="$router.push('/homepage/webbook')">文学</a>
                        </li>
                        <li class="nav-item">
                        <a class="nav-link" @click="$router.push('/homepage/computerbook')">小说</a>
                        </li>
                        <li class="nav-item">
                        <a class="nav-link" @click="$router.push('/mange')">购物车</a>
                        </li>
                        <li class="nav-item">
                        <a class="nav-link" @click="$router.push('/mange')">个人中心</a>
                        </li>
                        <li class="nav-item">
                        <a class="nav-link" @click="$router.push('/about')">关于我们</a>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    </div>
</template>
<style>
    .bg-navbar{
        background-color: rgb(141, 13, 13);
    }
</style>