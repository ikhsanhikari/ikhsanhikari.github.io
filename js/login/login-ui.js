class LoginUi {
    constructor() {
    }

    render() {
        loginSignup.innerHTML = this.renderLogin();
    }

    renderLogin(){
        const loginContent = `<div class="card-header btnBgGeneral ">
        Log In
        </div>
        <div class="card-body" style="opacity:1">
            <div class="row">
                <div class="col-md-12">
                    <div class="form-group">
                        <label for="email">Email</label>
                        <input type="email" id="email" class="form-control">
                    </div>
                    <div class="form-group">
                        <label for="password">Password</label>
                        <input type="password" id="password" class="form-control">
                    </div>
                    <button class="btn btnBgGeneral" onclick="login(this)">Log In</button>
                    <div class="responseErrorLogin alert "></div>
                </div>
            </div>
        </div>`;
        return loginContent;
    }

    renderSignup(){
        const signupContent = `<div class="card-header btnBgGeneral ">
        Sign Up
        </div>
        <div class="card-body">
        <div class="row">
        <div class="col-md-12">
            <div class="form-group">
                <label for="firstname">First Name</label>
                <input type="text" id="firstname" class="form-control">
            </div>
            <div class="form-group">
                <label for="lastname">Last Name</label>
                <input type="text" id="lastname" class="form-control">
            </div>
            <div class="form-group">
                <label for="phone">Phone Number </label>
                <input type="text" id="phone" class="form-control">
            </div>
            <div class="form-group">
                <label for="email">Email</label>
                <input type="email" id="email" class="form-control">
            </div>
            <div class="form-group">
                <label for="password">Password</label>
                <input type="password" id="password" class="form-control">
            </div>
            <div class="form-group">
                <label for="address">Address </label>
                <textarea id="address" cols="30" rows="5" class="form-control"></textarea>
            </div>
            <div class="form-group">
                <label for="business">Business Interest</label>
                <select id="business"  class="form-control">
                    <option value="0" selected disabled>choose</option>
                    <option value="Coffe Shop">Coffe Shop</option>
                    <option value="Laundry">Laundry</option>
                    <option value="Salon">Salon</option>
                </select>
            </div>
            <div class="form-group">
                <label for="role">Role</label>
                <select id="role" class="form-control">
                    <option value="1">User</option>
                    <option value="2">UMKM</option>
                </select>
            </div>
            <div class="form-group">
                <label for="description">Description </label>
                <textarea id="description" cols="30" rows="5" class="form-control"></textarea>
            </div>
            <br>
            <button class="btn btnBgGeneral" onclick="signup()">Sign Up</button>
        </div>
        </div>
        </div>`;
        return signupContent;
        
    }
}
